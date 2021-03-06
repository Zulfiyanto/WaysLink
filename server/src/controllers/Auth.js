const { users } = require("../../models/");

const Joi = require("joi");

// import package here
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    email: Joi.string().email().min(9).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    fullname: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({ status: "error", message: error.details[0].message });
  }
  try {
    const encrypt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(req.body.password, encrypt);

    const data = await users.create({
      email: req.body.email,
      password: hashPass,
      fullname: req.body.fullname,
    });
    const dataToken = {
      password: data.password,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);
    res.status(200).send({
      status: "success",
      data: {
        user: { email: data.email, token },
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", message: "Server Error" });
  }
};

// Login Controllers
exports.Login = async (req, res) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(0).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ status: "error", message: error.details[0].message });
    }

    const userExist = await users.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(401).send({
        stasus: "failed",
        message: "Email and Password dont match",
      });
    }

    // Generate token
    const dataToken = {
      id: userExist.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          ...userExist.dataValues,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: "failed", message: "Server Error" });
  }
};

// Auth Controllers
exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          ...dataUser.dataValues,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
