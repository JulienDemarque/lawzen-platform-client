export function removeDuplicate(list) {
  var seen = {};
  return list.filter(function(law) {
    console.log(law.title);
    console.log(seen);
    return seen.hasOwnProperty(law.title) ? false : (seen[law.title] = true);
  });
}
