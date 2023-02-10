import crypto from 'crypto';

let users = [
  {
    id: '1',
    nome: 'Luca',
    cognome: 'Rossi',
    email: 'lica.rossi@gmail.it',
  },
  {
    id: '2',
    nome: 'Marco',
    cognome: 'Verdi',
    email: 'marco.verdi@gmail.it',
  },
];

export const getAllUser = (req, res) => {
  res.send(users);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  if (id) {
    const userById = users.find((user) => user.id == id);
    res.send(userById);
  } else {
    res.status(404).send('No user found');
  }
};

export const postUser = (req, res) => {
  const user = { id: crypto.randomUUID(), ...req.body };
  users.push(user);
  res.send({
    message: `L'utente con email ${user.email} aggiunto con successo.`,
    data: users,
  });
};

export const patchUser = (req, res) => {
  const { id } = req.params;
  let userFound = users.find((user) => user.id === id);
  users = users.filter((user) => user.id !== id);
  userFound = { ...userFound, ...req.body };
  users.push(userFound);
  res.send(users);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    users = users.filter((user) => user.id !== id);
    res.send(`User with id: ${id} deleted`);
  } else {
    res.status(404).send('No user found');
  }
};