const { users, brands } = require("../../models/");

exports.GetUser = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await users.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const user = {
      ...data,
    };

    res.send({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const Data = {
      ...data,
    };

    await users.update(Data, {
      where: { id },
    });

    res.send({
      status: "success",
      data: { user: Data },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await users.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        user: {
          id,
        },
      },
    });
  } catch (error) {}
};
