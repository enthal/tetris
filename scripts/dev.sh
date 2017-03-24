
cd `dirname $0`/..
mkdir -p out
browserify -r lodash > out/vendor.js   # TODO: automate discovery of vendor list
budo app/index.js --dir app/public --dir out --live -- -x lodash
