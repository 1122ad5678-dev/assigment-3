let materials = [];
let idCounter = 1;

const getAll = () => {
  // return a copy sorted by createdAt (newest first)
  return [...materials].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const add = ({ title, type, description, url }) => {
  const item = { id: idCounter++, title, type, description, url, createdAt: new Date().toISOString() };
  materials = [item, ...materials];
  return item;
};

const remove = (id) => {
  materials = materials.filter((m) => m.id !== id);
};

export default { getAll, add, remove };
