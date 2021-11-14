import styled from "styled-components";
import { PWide } from "./ProfileComponent";
import defaultImage from "../assets/img/defaultImage.png";
import { useState } from "react";
import { API } from "../config/Api";
import { useHistory } from "react-router-dom";
import Phone4 from "../assets/img/Phone.png";

export const CreateLinkBody = () => {
  let history = useHistory();
  const [previewBrand, setPreviewBrand] = useState(null);
  const [form, setForm] = useState({
    title_brand: "",
    description: "",
    image_brand: "",
  });
  const [link, setAdd] = useState([{ title: "", url: "", image: "", preview: "" }]);
  const addLink = () => {
    setAdd([...link, { title: "", url: "", image: "", preview: "" }]);
  };
  console.log(form);
  const OnChangeBrand = (e, i) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewBrand(url);
    }
  };

  const OnChangeLink = (e, i) => {
    let addArr = [...link];
    console.log(addArr);

    if (e.target.name === `title${i}`) {
      addArr[i].title = e.target.value;
      setAdd(addArr);
    }
    if (e.target.name === `url${i}`) {
      addArr[i].url = e.target.value;
      setAdd(addArr);
    }
    if (e.target.name === `image${i}`) {
      addArr[i].image = e.target.files;
      setAdd(addArr);
    }

    if (e.target.name === `image${i}`) {
      addArr[i].preview = URL.createObjectURL(e.target.files[0]);
      setAdd(addArr);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // const data = JSON.stringify({ ...form, link });
      // console.log(data);
      const formData = new FormData();

      formData.set("title_brand", form.title_brand);
      formData.set("description", form.description);
      formData.set("image", form.image_brand[0], form.image_brand[0].name);
      link.map((state) => {
        formData.append("title", state.title);
        formData.append("url", state.url);
        formData.append("image", state.image[0]);
      });

      await API.post("/brand", formData, config);

      history.push("/mylink");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CreateBody>
      <div className="header-publish mb-4">
        <div className="header-title">Create Link</div>
        <button className="yellow-btn" onClick={onSubmit}>
          Publish Link
        </button>
      </div>

      <div className="body-link">
        <div className="left-section">
          <BoxForm>
            <div className="upload-forms mb-5">
              {previewBrand ? (
                <img
                  src={previewBrand}
                  alt="previewbrand"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={defaultImage}
                  alt="previewbrand"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
              )}
              <input
                type="file"
                name="image_brand"
                id="imgs"
                style={{ width: "100%", display: "none", height: "100%" }}
                onChange={OnChangeBrand}
              />
              <label className="yellow-btn upload-input" htmlFor="imgs">
                Upload
              </label>
            </div>
            <div className="title-form input-label">
              Title
              <input
                type="text"
                name="title_brand"
                value={form.title_brand}
                onChange={OnChangeBrand}
              />
            </div>
            <div className="description-form input-label">
              Description
              <textarea
                name=""
                id=""
                name="description"
                value={form.description}
                onChange={OnChangeBrand}
              ></textarea>
            </div>
            {link.map((state, i) => (
              <div key={i} className="add-link mb-5">
                <div className="link-image">
                  {state.preview ? (
                    <img
                      src={state.preview}
                      alt="previewlink"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "250px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      alt="previewbrand"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "250px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <input
                    type="file"
                    name={`image${i}`}
                    id={`img${i}`}
                    style={{ width: "100%", display: "none", height: "100%" }}
                    onChange={(e) => OnChangeLink(e, i)}
                  />
                  <label className="yellow-btn" htmlFor={`img${i}`}>
                    Upload
                  </label>
                </div>
                <div className="input-group input-label">
                  Title Link
                  <input
                    className="mb-3"
                    name={`title${i}`}
                    type="text"
                    onChange={(e) => OnChangeLink(e, i)}
                  />
                  Link
                  <input
                    type="text"
                    name={`url${i}`}
                    value={state.url}
                    onChange={(e) => OnChangeLink(e, i)}
                  />
                </div>
              </div>
            ))}
            <button onClick={addLink} className="add-btn yellow-btn">
              Add new link
            </button>
          </BoxForm>
        </div>
        <div className="right-section">
          <img src={Phone4} alt="" />
        </div>
      </div>


      
    </CreateBody>
  );
};

const CreateBody = styled.div`
  padding: 40px 50px;
  height: 80vh;
  .header-publish {
    display: flex;
    justify-content: space-between;
  }
  .body-link {
    display: flex;
    height: 70vh;
    .right-section {
      width: 40%;
      height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
      }
    }
    .left-section {
      width: 60%;
    }
  }
`;

const BoxForm = styled.div`
  background-color: white;
  overflow: scroll;
  height: 75vh;
  padding: 20px;
  border-radius: 10px;
  ::-webkit-scrollbar {
    width: 5px;
    height: 30%;
  }
  .upload-forms {
    display: flex;
    align-items: center;
    button,
    label {
      height: 5vh;
      margin-left: 50px;
      display: flex;
      align-items: center;
    }
  }
  .title-form,
  .description-form,
  .input-group {
    display: flex;
    flex-direction: column;
  }
  input,
  textarea {
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    font-size: 2rem;
    font-weight: 600;
  }

  .add-link {
    background-color: #ececec;
    display: flex;
    padding: 20px;
    border-radius: 10px;
    img {
      height: 15vh;
      width: 20%;
      margin-right: 20px;
    }
    input {
      background-color: #ececec;
    }
    .link-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 99%;
        margin-bottom: 10px;
      }
      label {
        height: 5vh;
        display: flex;
        align-items: center;
      }
    }
  }

  .add-btn {
    width: 100%;
    height: 6vh;
  }
`;
