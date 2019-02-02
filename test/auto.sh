set -e

export TESTS="$(ls test/auto | grep '.in' | awk '{print $4}')"
for TEST in $TESTS
do
  echo "RUNNING ${TEST}"
  export CASEBODY="$(cat TEST)"
  node build/cli.js --casebody "${CASEBODY}"
done
