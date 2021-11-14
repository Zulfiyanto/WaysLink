import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { API } from "../config/Api";

export const Mockup = () => {
  const { unique } = useParams();
  const [brand, setBrand] = useState([]);

  const getBrand = async (id) => {
    try {
      const response = await API.get("/brand/" + id);
      setBrand(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Link = (src) => {
    window.open(`https://${src}`, "_blank");
  };

  useEffect(() => {
    getBrand(unique);
  }, []);
  return (
    <MockupBody>
      <div className="photo-mockup mb-5 mt-5">
        <img src={brand.image_brand} alt="" />
      </div>
      <div className="title-mockup mb-3">{brand.title_brand}</div>
      <div className="description-mockup mb-4">{brand.description}</div>
      {brand?.link?.map((set, i) => (
        <div onClick={() => Link(set.url)} key={i} className="box-link">
          <div className="row-link">
            <img src={`http://localhost:5000/uploads/${set.image}`} alt="" />
            {set.title}
          </div>
        </div>
      ))}
    </MockupBody>
  );
};

const MockupBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .photo-mockup {
    display: flex;
    justify-content: center;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
  .title-mockup {
    font-size: 2rem;
    font-weight: 700;
  }
  .description-mockup {
    font-size: 1.5rem;
  }

  .box-link {
    background-color: black;
    color: white;
    width: 30%;
    margin-bottom: 50px;
    height: 8vh;
    position: relative;
    .row-link {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
      font-size: 2rem;
      img {
        left: 15px;
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 200px;
      }
    }
  }
`;
