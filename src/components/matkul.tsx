export const Matkul: React.FC<{
  namaMatkul: string;
  sks: number;
  idMatkul: string;
  idKelas: string;
}> = ({ idKelas, idMatkul, namaMatkul, sks }) => {
  return (
    <div className="text-white p-2">
      <div className="bg-palette-4 p-1">
        <p className="text-center font-bold">🚀{namaMatkul}</p>
        <p>
          <i className="fas fa-layer-group"></i>
          {"  "}
          {sks} SKS - {sks == 2 ? 14 : sks == 3 ? 31 : 0} Pertemuan
        </p>
        <a href={`/dashboard/presensi/${idMatkul}/${idKelas}`}>
          <button className="px-2 rounded-md bg-palette-6">
            <i className="fas fa-info-circle px-1"></i>Details
          </button>
        </a>
      </div>
    </div>
  );
};

export const MaktulGroup: React.FC<{
  matkulCollection: {
    namaMatkul: string;
    sks: number;
    idMatkul: string;
    idKelas: string;
  }[];
}> = ({ matkulCollection }) => {
  return (
    <div className="grid grid-cols-4">
      {matkulCollection.map((e) => (
        <Matkul
          idKelas={e.idKelas}
          idMatkul={e.idMatkul}
          namaMatkul={e.namaMatkul}
          sks={e.sks}
        />
      ))}
    </div>
  );
};
