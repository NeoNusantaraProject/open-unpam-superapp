import { useEffect, useState } from "react";
import { initAPI } from "../../utilities/apiprovider";
import type { AstroCookies } from "astro";

interface IFinanceData {
  channel: string;
  keterangan: string;
  nama_tempat_bayar: string;
  no_tagihan: string;
  nomor_urut: string;
  peruntukan: any;
  status: string;
  tanggal_bayar: string;
  total_tagihan: string;
}

const Finance: React.FC<{
  astroCookies: { myUNPAMToken: string; presensiToken: string };
}> = ({ astroCookies }) => {
  const [financeData, setFinanceData] = useState<IFinanceData[]>();

  useEffect(() => {
    const api = initAPI(astroCookies, "ProxyFetchAPI");
    api.myunpam.getFinanceData().then((e) => setFinanceData(e.data.tagihan));
  }, []);

  return (
    <div className="text-white">
      <table className="min-w-full">
        <thead>
          <tr className="rounded-tl-lg rounded-tr-lg bg-palette-3">
            <th>No. Tagihan</th>
            <th>No. Urut</th>
            <th>Pembayaran</th>
            <th>Jumlah Bayar</th>
            <th>Status Bayar</th>
            <th>Tanggal Bayar</th>
            <th>Channel Pembayaran</th>
            <th>Tempat Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {financeData &&
            financeData.map((e, i) => (
              <tr key={i} className="odd:bg-palette-5 even:bg-palette-6">
                <td className={`text-center`}>{e.no_tagihan}</td>
                <td className={`text-center`}>{e.nomor_urut}</td>
                <td>{e.keterangan}</td>
                <td>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "decimal",
                    currency: "IDR",
                  }).format(parseInt(e.total_tagihan))}
                </td>
                <td className="px-2 py-1">
                  <p
                    className={`text-center rounded-md ${
                      e.status == "LUNAS" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {e.status}
                  </p>
                </td>
                <td className={`text-center`}>
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(e.tanggal_bayar))}
                </td>
                <td className={`text-center`}>{e.channel}</td>
                <td className={`text-center`}>{e.nama_tempat_bayar}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {financeData && (
        <p className="bg-palette-4 px-4 py-2">
          Total Tagihan belum dilunaskan berjumlah:{" "}
          <span className="px-2 py-1 rounded-lg bg-red-400">
            Rp.
            {new Intl.NumberFormat("id-ID", {
              style: "decimal",
              currency: "IDR",
            }).format(
              financeData
                .filter((e) => e.status == "BELUM LUNAS")
                .reduce((pref, current) => {
                  return pref + parseInt(current.total_tagihan);
                }, 0)
            )}
          </span>
        </p>
      )}
    </div>
  );
};

export default Finance;
