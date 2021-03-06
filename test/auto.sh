set -e

export TEST_INS="$(ls test/auto | grep '.in')"
for TEST_IN in $TEST_INS
do
  echo "RUNNING ${TEST_IN}"
  export CASEBODY="$(cat test/auto/${TEST_IN})"
  export TEST_OUT="${TEST_IN::-3}.out"
  export EXPECTED_OUT="$(cat test/auto/${TEST_OUT})"
  export ACTUAL_OUT="$(node build/cli.js --casebody "${CASEBODY}")"
  export DIFF="$(diff <(echo ${EXPECTED_OUT}) <(echo ${ACTUAL_OUT}))"
  if [ -n "$DIFF" ]; then
    echo "FAILURE ${TEST_OUT}"
    echo $DIFF
    exit 1
  else
    echo "PASS ${TEST_OUT}"
  fi
done
