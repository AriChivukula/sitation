set -e

export TESTS="$(ls test/auto)"
echo "RUNNING ${TESTS}"
export TESTS="$(ls test/auto | grep '.in')"
echo "RUNNING ${TESTS}"
export TESTS="$(ls test/auto | grep '.in' | awk '{print $4}')"
echo "RUNNING ${TESTS}"
for TEST in $TESTS
do
  echo "RUNNING ${TEST}"
  export CASEBODY="$(cat TEST)"
  node build/cli.js --casebody "${CASEBODY}"
done
