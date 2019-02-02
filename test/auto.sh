set -e

export TESTS="$(ls /test/auto | grep '.in' | awk '{print $4}')"
echo "${TESTS}"
for TEST in $TESTS
do
  echo "${TEST}"
  export CASEBODY="$(cat TEST)"
  node build/cli.js --casebody "${CASEBODY}"
done
