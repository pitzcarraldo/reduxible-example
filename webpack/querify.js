module.exports = function querify(loaders) {
  const queries = [];
  Object.keys(loaders).map((name)=>{
    queries.push(name + '?' + JSON.stringify(loaders[name]));
  });
  return queries.join('!');
};
