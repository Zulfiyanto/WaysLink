const { links, brands } = require("../../models/");
const Joi = require("joi");

exports.AddBrands = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const brand = await brands.create({
      ...data,
      image_brand: req.files[0].filename,
      unique_link: Date.now(),
      view_count: 0,
      user_id: req.user.id,
    });
    // console.log(data);
    const titles = data.title.map((state, i) => ({
      title: state,
      url: data.url[i],
      brand_id: brand.id,
      image: req.files[i + 1].filename,
    }));

    await links.bulkCreate(titles);

    const dataBrand = await brands.findOne({
      where: {
        id: brand.id,
      },
      include: {
        model: links,
        as: "link",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        link: {
          ...dataBrand.dataValues,
          image: process.env.FILE_PATH + dataBrand.image_brand,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetBrands = async (req, res) => {
  try {
    let datas = await brands.findAll({
      where: {
        user_id: req.user.id,
      },
      include: {
        model: links,
        as: "link",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    datas = JSON.parse(JSON.stringify(datas));

    datas = datas.map((state) => {
      return {
        ...state,
        image_brand: process.env.FILE_PATH + state.image_brand,
      };
    });
    res.status(200).send({
      success: "success",
      datas,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetBrand = async (req, res) => {
  try {
    const { unique_link } = req.params;

    let data = await brands.findOne({
      where: {
        unique_link,
      },
      include: {
        model: links,
        as: "link",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image_brand: process.env.FILE_PATH + data.image_brand,
    };

    res.status(200).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    await brands.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
