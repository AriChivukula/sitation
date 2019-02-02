set -e

export TEST_INS="$(ls test/auto | grep '.in')"
for TEST_IN in $TEST_INS
do
  echo "TEST_IN ${TEST_IN}"
  export CASEBODY = "$(cat TEST_IN)"
  echo "CASEBODY ${CASEBODY}"
  export TEST_OUT = "${TEST_IN::-3}.out"
  echo "TEST_OUT ${TEST_OUT}"
  export EXPECTED_OUT = "$(cat TEST_OUT)"
  echo "EXPECTED_OUT ${EXPECTED_OUT}"
  echo "RUNNING ${TEST_IN}"
  export ACTUAL_OUT = "$(node build/cli.js --casebody ${CASEBODY})"
  echo "ACTUAL_OUT ${ACTUAL_OUT}"
  diff  <(echo "$EXPECTED_OUT" ) <(echo "$ACTUAL_OUT")
done
