const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    
    // Mengambil role pengguna
    const role = user.role;

    // Mengembalikan email, token, dan role sebagai respons
    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


//registerUser
const registerUser = async (req, res) => {
  const { name, nim, username, email, password, role } = req.body;

  try {
    const user = await User.register(
      name,
      nim,
      username,
      email,
      password,
      role
    );
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
		const schemaGetAll = await User.find();
		res.json(schemaGetAll);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
}

const getUserById = async (req, res) => {
  try {
		const user = await User.findOne({ _id: req.params.id });
		// res.json(schemaGetAll);
    const role = user.role;
    res.status(200).json(role);
	} catch (e) {
		console.error(e);
		res.status(500).send("error");
	}
}

const getUsersByRoleMahasiswa = async (req, res) => {
  try {
    const users = await User.find({ role: "mahasiswa" }).exec();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
};


const getRoleByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    const role = user.role;
    res.status(200).json({ email, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser, getUser, getUserById, getRoleByEmail, getUsersByRoleMahasiswa };
