import { Container } from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io5";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container className="mt-5">
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt in
        velit, inventore perspiciatis ducimus quam! Eligendi, libero
        perspiciatis nihil iure eos eius, illum tempore voluptate fugiat
        possimus odit! Laudantium harum atque eaque laborum alias dignissimos,
        doloremque exercitationem ad, vero quis ipsa consequuntur eveniet
        tempore consequatur adipisci molestias nulla eligendi iste aut
        repellendus quod. Consectetur voluptatibus obcaecati illo, eligendi
        explicabo eaque hic corporis ducimus vero esse repudiandae libero nulla
        saepe porro ipsa sit voluptate, sequi ullam recusandae. Molestiae amet
        voluptatem sint cupiditate modi error accusantium eos explicabo, eius id
        natus neque eaque laudantium, dicta, nam voluptate autem reprehenderit
        libero! Ut voluptatem expedita fugiat cupiditate assumenda, sapiente
        quibusdam obcaecati quod corporis quaerat vel fugit accusamus sint totam
        ad cumque officia maxime voluptas, provident voluptatum? Aut quis soluta
        tempora distinctio nostrum perspiciatis quo laborum dolor adipisci,
        commodi saepe impedit corrupti vitae maxime sunt necessitatibus,
        exercitationem consequatur tempore nisi dolores neque vero. Optio,
        magni?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, quasi
        exercitationem? Recusandae, perspiciatis sit repellendus exercitationem
        quae incidunt voluptatem ea. Quae velit est accusamus. Nemo nisi quos
        atque quasi unde! Eaque, vel. Impedit recusandae sed consectetur
        perferendis mollitia et odit hic rem saepe. Rerum excepturi quidem earum
        harum ex quod distinctio voluptatem perspiciatis! Recusandae officiis
        tenetur voluptatem pariatur eveniet alias dicta vero fugiat provident
        mollitia, at quam nisi hic vitae id quis sed. Aperiam alias
        exercitationem iusto sapiente voluptatibus explicabo iste sed. Laborum
        voluptatem officiis magnam, dolorum repellat illum animi iusto modi odio
        similique. Voluptate asperiores voluptates repellendus quidem
        voluptatibus.
      </p>
      <Container className="d-flex align-items-center p-0">
        <h2 className="fs-3 me-2">Links:</h2>
        <Link target="_blank" to="https://github.com/fradaaa">
          <IoLogoGithub style={{ width: "50px", height: "50px" }} />
        </Link>
      </Container>
    </Container>
  );
};

export default About;
