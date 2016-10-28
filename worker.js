
function arrayGenerator(e) {
  var arrayItems = []
  for (var i = 0; i < e.data; i++) {
    do {
      randomNumber = Math.floor((Math.random() * e.data) + 1)
    } while (arrayItems.indexOf(randomNumber) >= 0);
    arrayItems.push(randomNumber)
  }
  return arrayItems
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {

    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;

    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i
}

function quickSort(items, left, right) {
    var index

    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left
        right = typeof right != "number" ? items.length - 1 : right

        index = partition(items, left, right)

        if (left < index - 1) {
            quickSort(items, left, index - 1)
        }

        if (index < right) {
            quickSort(items, index, right)
        }

    }
    return items
}

self.onmessage = function(numberOfItems) {
  var start_arrayGenerator = new Date().getTime()

  var originalRandomArray = arrayGenerator(numberOfItems)

  var end_arrayGenerator = new Date().getTime()
  var randomArrayTotalTime = end_arrayGenerator - start_arrayGenerator

  var randomArray = originalRandomArray.slice(0)

  var start_sortedArray = new Date().getTime()

  var sortedArray = quickSort(originalRandomArray)

  var end_sortedArray = new Date().getTime()
  var sortedArrayTotalTime = end_sortedArray - start_sortedArray

  postMessage({
    'randomArray': randomArray,
    'randomArrayTotalTime': randomArrayTotalTime,
    'sortedArray': sortedArray,
    'sortedArrayTotalTime': sortedArrayTotalTime
  })
}
