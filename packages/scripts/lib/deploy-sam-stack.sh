#!/usr/bin/env bash

set -e

while [[ $# -gt 0 ]]; do
  key="$1"

  case "$key" in
    -b|--bucket) S3_BUCKET="$2" && shift && shift ;;
    -d|--directory) DIRECTORY="$2" && shift && shift ;;
    -n|--name) NAME="$2" && shift && shift ;;
    -p|--params) PARAMS="$2" && shift && shift ;;
    -r|--region) REGION="$2" && shift && shift ;;
    -t|--template) TEMPLATE="$2" && shift && shift ;;
    *) shift ;;
  esac
done

DIRECTORY="${DIRECTORY:-templates}"
REGION="${REGION:-us-east-1}"
S3_BUCKET="${S3_BUCKET:-spraoi-cloudformation-templates}"

TEMPLATE_FILE="${DIRECTORY}/${TEMPLATE}.yml"
TEMPLATE_PACKAGED_FILE="${DIRECTORY}/${TEMPLATE}-packaged.yml"

if [[ -z "$PARAMS" ]]; then
  echo "ERROR: please specify template params (-p|--params)" 1>&2
  exit 1
fi

if [[ ! -f "$TEMPLATE_FILE" ]]; then
  echo "ERROR: please specify a valid template (-t|--template)" 1>&2
  exit 1
fi

aws s3api head-bucket \
  --bucket "$S3_BUCKET" || \
    aws s3api create-bucket \
      --bucket "$S3_BUCKET" \
      --region "$REGION"

aws cloudformation package \
  --output-template-file "$TEMPLATE_PACKAGED_FILE"  \
  --s3-bucket "$S3_BUCKET" \
  --template-file "$TEMPLATE_FILE"

aws cloudformation deploy \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides $PARAMS \
  --s3-bucket "$S3_BUCKET" \
  --stack-name "${NAME:-$TEMPLATE}" \
  --template-file "$TEMPLATE_PACKAGED_FILE"
