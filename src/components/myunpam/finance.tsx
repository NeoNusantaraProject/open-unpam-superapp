import { useEffect } from "react";
import { initAPI } from "../../utilities/apiprovider";
import type { AstroCookies } from "astro";

const Finance: React.FC<{
  astroCookies: { myUNPAMToken: string; presensiToken: string };
}> = ({ astroCookies }) => {
  useEffect(() => {
    const api = initAPI(astroCookies, "ProxyFetchAPI");
    console.log(api.myunpam.getFinanceData());
  }, []);

  return (
    <div className="px-12 text-white">
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
          <tr className="odd:bg-palette-5 even:bg-palette-6">
            <td>2310121846502201</td>
            <td>1</td>
            <td>REGISTRASI</td>
            <td>Rp. 500.000</td>
            <td>LUNAS</td>
            <td>07 Agustus 2023</td>
            <td>LOKET</td>
            <td>UNPAM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Finance;
