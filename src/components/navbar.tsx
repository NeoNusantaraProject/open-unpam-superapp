import { useEffect, useState } from "react";

export default ({ username, nim }: { username: string; nim: string }) => {
  const [isColapse, setIsColapse] = useState<boolean>(true);

  const [docWidth, setDocWith] = useState(null);

  useEffect(() => {
    setDocWith(window.innerWidth);
  }, []);

  return (
    <>
      <div
        className={`${
          !(docWidth < 600 && !isColapse) ? "visible" : "hidden"
        } xl:visible grid xl:grid-cols-3 items-center h-full`}
      >
        <div className="flex justify-start">
          <p className="text-center xl:text-left w-full">
            Authenticated as: {!isColapse && <br />}
            {username} / {nim}
          </p>
        </div>
        <a className="w-full xl:flex xl:justify-center" href={"/dashboard"}>
          <button className="w-full xl:w-auto bg-palette-6 px-2 rounded-md">
            <i className="fas fa-home-lg"></i>
          </button>
        </a>
        <div className="xl:flex xl:justify-end">
          <a href="/dashboard/notifyme">
            <button className="w-full bg-palette-6 px-2 rounded-md">
              <i className="fas fa-bell-on"></i>
            </button>
          </a>
          <a href="/logout">
            <button className="w-full bg-palette-6 px-2 rounded-md">
              {" "}
              Logout
            </button>
          </a>
        </div>
      </div>
      <button
        className="visible xl:hidden w-full"
        onClick={() => setIsColapse(!isColapse)}
      >
        {isColapse ? (
          <i className="far fa-chevron-double-down"></i>
        ) : (
          <i className="far fa-chevron-double-up"></i>
        )}
      </button>
      {!(docWidth < 600 && isColapse).toString()}
    </>
  );
};
