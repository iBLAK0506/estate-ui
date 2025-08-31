import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";

function SinglePage() {
  const { id } = useParams(); // get property ID from URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property", err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={property.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{property.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{property.address}</span>
                </div>
                <div className="price">$ {property.price}</div>
              </div>
              <div className="user">
                <img src={property.user?.img || "/noavatar.png"} alt="" />
                <span>{property.user?.name || "Unknown"}</span>
              </div>
            </div>
            <div className="bottom">{property.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[property]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
