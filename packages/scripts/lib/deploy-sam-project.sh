#!/usr/bin/env bash

set -e

ALLOW_HEADERS="'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,x-spr-user-id,x-spr-agent-id,x-spr-pool-id,x-spr-for-user-id,x-spr-survey-response-id,x-spr-business-id,x-spr-location-id,x-spr-client-id,x-spr-user-client-id,x-spr-group-id,x-spr-ge-group-id,x-spr-group-plan-id,x-customer-number'"
S3_BUCKET="spraoi-cloudformation-templates"

while [[ $# -gt 0 ]]; do
  key="$1"

  case "$key" in
    -a|--api-version) API_VERSION="$2" && shift && shift ;;
    -b|--bucket) S3_BUCKET="$2" && shift && shift ;;
    -d|--domain) DOMAIN="$2" && shift && shift ;;
    -e|--environment) ENVIRONMENT="$2" && shift && shift ;;
    -t|--template) TEMPLATE="$2" && shift && shift ;;
    -v|--variation) VARIATION="$2" && shift && shift ;;
    *) shift ;;
  esac
done

if [[ -z "$ENVIRONMENT" ]]; then
  echo "ERROR: please specify an environment (-e|--environment)" 1>&2
  exit 1
fi

if [[ -z "$TEMPLATE" ]]; then
  echo "ERROR: please specify a template (-t|--template)" 1>&2
  exit 1
fi

if [[ -z "$VARIATION" ]]; then
  echo "ERROR: please specify a variation name (-v|--variation)" 1>&2
  exit 1
fi

if [[ -z "$DOMAIN" ]]; then
  if [[ "$ENVIRONMENT" == 'prod' ]]; then
    DOMAIN="${TEMPLATE}-${VARIATION}.spraoi.ai"
  else
    DOMAIN="${TEMPLATE}-${VARIATION}.${ENVIRONMENT}.spraoi.ai"
  fi
fi

API_VERSION="${API_VERSION:-v1}"

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
  --name "$(cap "$TEMPLATE")$(capAll "$VARIATION")$(cap "$ENVIRONMENT")" \
  --params "AllowHeaders=$ALLOW_HEADERS ApiVersion=$API_VERSION Environment=$ENVIRONMENT Template=$TEMPLATE Variation=$VARIATION FullDomainName=$DOMAIN" \
  --template "$TEMPLATE"
