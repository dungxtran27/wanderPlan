import "../styles/About.css";

const About = () => {
  let data = [
    {
      id: 1,
      imgSrc: "/img/1.jpg",
    },
    {
      id: 2,
      imgSrc: "/img/2.jpg",
    },
    {
      id: 3,
      imgSrc: "/img/3 (2).jpg",
    },
    {
      id: 4,
      imgSrc: "/img/4.jpg",
    },
    {
      id: 5,
      imgSrc: "/img/5.jpg",
    },
    {
      id: 6,
      imgSrc: "/img/6.jpg",
    },
    {
      id: 7,
      imgSrc: "/img/7.jpg",
    },
    {
      id: 8,
      imgSrc: "/img/8.jpg",
    },
    {
      id: 9,
      imgSrc: "/img/9.jpg",
    },
    {
      id: 10,
      imgSrc: "/img/10.png",
    },
    {
      id: 6,
      imgSrc: "/img/11.jpg",
    },
    {
      id: 6,
      imgSrc: "/img/12.jpg",
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>About Us</h1>

      <div>
        <h5
          style={{ marginLeft: "20%", marginRight: "20%", marginTop: "20px" }}
        >
          WanderPlan is a convenient online platform that simplifies trip
          planning for travelers. It offers a wide range of travel services,
          including flights, hotels, car rentals, and vacation packages, all
          easily accessible through a user-friendly interface. With real-time
          availability and secure booking options, travelers can find and
          reserve their ideal itineraries hassle-free, making their dream
          vacations a reality.
        </h5>
      </div>

      <div className="gallery">
        {data.map((item, index) => {
          return (
            <div className="pics" key={index}>
              <img src={item.imgSrc} style={{ width: "100%" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
