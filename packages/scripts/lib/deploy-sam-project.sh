#!/usr/bin/env bash

set -e

while [[ $# -gt 0 ]]; do
  key="$1"

  case "$key" in
    -d|--domain) DOMAIN="$2" && shift && shift ;;
    -e|--environment) ENVIRONMENT="$2" && shift && shift ;;
    -p|--project) PROJECT="$2" && shift && shift ;;
    -v|--variation) VARIATION="$2" && shift && shift ;;
    *) shift ;;
  esac
done

S3_BUCKET="spr-${PROJECT}-${VARIATION}-${ENVIRONMENT}-cloudformation-templates"
S3_BUCKET_SHORT="spr-${PROJECT}-${VARIATION}-${ENVIRONMENT}-cf-templates"
[[ ${#S3_BUCKET} -gt 63 ]] && S3_BUCKET="$S3_BUCKET_SHORT"

if [[ -z "$ENVIRONMENT" ]]; then
  echo "ERROR: please specify an environment (-e|--environment)" 1>&2
  exit 1
fi

if [[ -z "$PROJECT" ]]; then
  echo "ERROR: please specify a project (-p|--project)" 1>&2
  exit 1
fi

if [[ -z "$VARIATION" ]]; then
  echo "ERROR: please specify a variation name (-v|--variation)" 1>&2
  exit 1
fi

if [[ -z "$DOMAIN" ]]; then
  if [[ "$ENVIRONMENT" == 'prod' ]]; then
    DOMAIN="${PROJECT}-${VARIATION}.spraoi.ai"
  else
    DOMAIN="${PROJECT}-${VARIATION}.${ENVIRONMENT}.spraoi.ai"
  fi
fi

if [[ -f "templates/${PROJECT}.yml" ]]; then
  TEMPLATE="$PROJECT"
else
  TEMPLATE="${PROJECT}/dist/${VARIATION}/template"
fi

# foo-bar-baz -> Foobarbaz
cap() {
  echo "$(tr '[:lower:]' '[:upper:]' <<< "${1:0:1}")${1:1}" | tr -d '-'
}

# foo-bar-baz -> FooBarBaz
capAll() {
  while read -r word; do
    res="${res}$(cap "$word")"
  done <<< "$(tr '-' '\n' <<< "$1")"

  echo "$res"
}

"$(dirname "$0")"/deploy-sam-stack.sh \
  --bucket "$S3_BUCKET" \
  --name "$(cap "$PROJECT")$(capAll "$VARIATION")$(cap "$ENVIRONMENT")" \
  --params "Environment=$ENVIRONMENT Template=$PROJECT Variation=$VARIATION FullDomainName=$DOMAIN" \
  --template "$TEMPLATE"
