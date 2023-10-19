import { useEffect, useState } from "react";
// import { initAPI } from "../../utilities/apiprovider";

const ExamPDF: React.FC<{
  astroCookies: { myUNPAMToken: string; presensiToken: string };
}> = ({ astroCookies }) => {
  const [uts, setUts] = useState({
    url: "",
    visible: false,
    message: "Loading",
  });
  const [uas, setUas] = useState({
    url: "",
    visible: false,
    message: "Loading",
  });

  useEffect(() => {
    fetch("/api/exampdf?semester=20231&examtype=uas", {
      headers: {
        Authorization: `Bearer ${astroCookies.myUNPAMToken}`,
      },
    })
      .then((e) => e.blob())
      .then(async (data) => {
        if (data.type != "application/pdf") {
          const responseData = JSON.parse(await data.text());
          setUas({
            visible: false,
            url: "",
            message: "Data Tidak Tersedia",
          });
          return;
        }
        const url = URL.createObjectURL(data);

        setUas({
          visible: true,
          url: url,
          message: "",
        });

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 300);
      });
    fetch("/api/exampdf?semester=20231&examtype=uts", {
      headers: {
        Authorization: `Bearer ${astroCookies.myUNPAMToken}`,
      },
    })
      .then((e) => e.blob())
      .then(async (data) => {
        if (data.type != "application/pdf") {
          const responseData = JSON.parse(await data.text());
          setUts({
            visible: false,
            url: "",
            message: "Data Tidak Tersedia",
          });
          return;
        }
        const url = URL.createObjectURL(data);

        setUts({
          visible: true,
          url: url,
          message: "",
        });

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 300);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 w-full h-full">
      {uts.visible ? (
        <iframe src={uts.url} className="w-full h-full"></iframe>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h2 className="text-white font-bold text-2xl">{uts.message}</h2>
        </div>
      )}
      {uas.visible ? (
        <iframe src={uas.url} className="w-full h-full"></iframe>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h2 className="text-white font-bold text-2xl">{uas.message}</h2>
        </div>
      )}
    </div>
  );
};

export default ExamPDF;
