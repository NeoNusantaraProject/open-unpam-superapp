interface IPertemuanProps {
  nama_pertemuan: string;
  jenis_perkuliahan: string;
  presensi_status: string;
  presensi_date: string;
  uid: string;
  qrcode: string;
  nama_dosen: string;
}

const Pertemuan = ({
  uid,
  qrcode,
  nama_pertemuan,
  jenis_perkuliahan,
  presensi_status,
  presensi_date,
  nama_dosen,
}: IPertemuanProps) => {
  return (
    <div className="text-white p-2">
      <div className="bg-palette-4 p-1">
        <div>
          <p className="text-center font-bold">🚀 {nama_pertemuan}</p>
          <p>{nama_dosen}</p>
          <p>
            <i
              className={`nf ${
                jenis_perkuliahan == "tatap muka"
                  ? "fas fa-user"
                  : jenis_perkuliahan == "e-learning"
                  ? "fas fa-laptop"
                  : "fad fa-circle"
              }`}
            ></i>
            {jenis_perkuliahan || "Belum ada"}
          </p>
          <span
            className={`px-1 rounded-md ${
              presensi_status == "hadir"
                ? "bg-green-600"
                : presensi_status == "absen"
                ? "bg-red-600"
                : "bg-palette-3"
            }`}
          >
            <i
              className={`nf ${
                presensi_status == "hadir"
                  ? "fas fa-check"
                  : presensi_status == "absen"
                  ? "fas fa-close"
                  : "fad fa-circle"
              }`}
            ></i>
            {presensi_status || "Belum Absensi"} - {presensi_date || "00"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 py-1">
          <a
            className="bg-palette-3 rounded-md text-center"
            href={`https://presensi.unpam.ac.id/jadwal/presensi/${uid}`}
          >
            <button>Scan QR</button>
          </a>
          <a
            className="bg-palette-3 rounded-md text-center"
            href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrcode}`}
            target="_blank"
          >
            <button>Get QR</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const PertemuanGroup: React.FC<{
  pertemuanCollection: IPertemuanProps[];
}> = ({ pertemuanCollection }) => {
  return pertemuanCollection ? (
    <div className="grid grid-cols-4">
      {pertemuanCollection.map((e, index) => (
        <Pertemuan
          nama_pertemuan={e.nama_pertemuan}
          jenis_perkuliahan={e.jenis_perkuliahan}
          presensi_status={e.presensi_status}
          presensi_date={e.presensi_date}
          uid={e.uid}
          qrcode={e.qrcode}
          nama_dosen={e.nama_dosen}
          key={index}
        />
      ))}
    </div>
  ) : (
    <div className="w-full flex justify-center">
      <h2 className="text-white font-bold text-2xl">
        Ooops There is something wrong with the API layer
      </h2>
    </div>
  );
};
