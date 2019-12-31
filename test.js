

let myMap = new Map()

myMap.set('(1,1)', t1)
myMap.set('(1,2)', t2)
myMap.get('(1,1)')

const printer = () => {

  for (let [key, value] of myMap) {
    //console.log(key + ' = ' + value)
  }

  for (let key of myMap.keys()) {
  //console.log(key)
  console.log(myMap.get('(1,1)'))
}

}

printer()
