function containsObjectWithProperty(array, key, value){
  for(var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return true;
      break;
    }
  }
  return false;
}
