set -e

export TEST_INS="$(ls test/auto | grep '.in')"
for TEST_IN in $TEST_INS
do
  echo "TEST_IN ${TEST_IN}"
  export CASEBODY="$(cat test/auto/${TEST_IN})"
  echo "CASEBODY ${CASEBODY}"
  export TEST_OUT="${TEST_IN::-3}.out"
  echo "TEST_OUT ${TEST_OUT}"
  export EXPECTED_OUT="$(cat test/auto/${TEST_OUT})"
  echo "EXPECTED_OUT ${EXPECTED_OUT}"
  echo "RUNNING ${TEST_IN}"
  export ACTUAL_OUT="$(node build/cli.js --casebody ${CASEBODY})"
  echo "ACTUAL_OUT ${ACTUAL_OUT}"
  export DIFF="$(diff <(echo ${EXPECTED_OUT}) <(echo ${ACTUAL_OUT}))"
  echo "DIFF ${DIFF}"
  if "${DIFF}" == ""; then
    echo "PASS"
  else
    echo "FAILURE"
    echo "${DIFF}"
    exit 1
  fi
done
