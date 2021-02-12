import HomeLogo from "../components/HomeLogo"

const Home = ({titles}) => {
    return (
        <div className={"app"}>
        <HomeLogo titles={titles}/>
        </div>
    );
};

export default Home;
