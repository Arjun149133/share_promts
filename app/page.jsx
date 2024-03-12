import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className=" desc text-center">
        Promptopia is a platform for discovering and sharing AI-generated
        prompts. Our goal is to help writers, artists, and creators of all kinds
        find inspiration and share their work with the world.
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
