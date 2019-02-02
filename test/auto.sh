set -e

export TEST_INS="$(ls test/auto | grep '.in')"
for TEST_IN in $TEST_INS
do
  echo "RUNNING ${TEST_IN}"
  export CASEBODY="$(cat test/auto/${TEST_IN})"
  export TEST_OUT="${TEST_IN::-3}.out"
  export EXPECTED_OUT="$(cat test/auto/${TEST_OUT})"
  export ACTUAL_OUT="$(node build/cli.js --casebody ${CASEBODY})"
  echo "ACTUAL_OUT ${ACTUAL_OUT}"
  export DIFF="$(diff <(echo ${EXPECTED_OUT}) <(echo ${ACTUAL_OUT}))"
  echo "DIFF ${DIFF}"
  if [ -n "$DIFF" ]; then
    echo "PASS"
  else
    echo "FAILURE"
    echo "${DIFF}"
    exit 1
  fi
done
