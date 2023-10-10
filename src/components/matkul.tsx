export const Matkul: React.FC<{
  namaMatkul: string;
  sks: number;
  idMatkul: string;
  idKelas: string;
}> = ({ idKelas, idMatkul, namaMatkul, sks }) => {
  return (
    <div className="text-white p-2">
      <div className="bg-palette-4 p-1">
        <p className="text-center">🚀{namaMatkul}</p>
        <p>
          {sks} SKS - {sks == 2 ? 14 : sks == 3 ? 31 : 0} Pertemuan
        </p>
        <a href={`/details/${idMatkul}/${idKelas}`}>
          <button className="px-1 rounded-md bg-palette-6">
            Details <i className="nf nf-fa-angle_right"></i>
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
