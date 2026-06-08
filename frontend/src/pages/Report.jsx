import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Report() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/reports');
        setReportData(response.data);
      } catch (error) {
        console.error('Failed to fetch report', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div>Loading report...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Promotions & Interested Customers Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Vehicle Brand</th>
              <th className="px-4 py-2 text-left">Promotion Title</th>
              <th className="px-4 py-2 text-left">Discount Value</th>
              <th className="px-4 py-2 text-left">Performance</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length === 0 ? (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">No data available for the report.</td>
              </tr>
            ) : (
              reportData.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{row.CustomerName}</td>
                  <td className="px-4 py-2">{row.VehicleBrand}</td>
                  <td className="px-4 py-2">{row.PromotionTitle}</td>
                  <td className="px-4 py-2">{row.DiscountValue}</td>
                  <td className="px-4 py-2">{row.Performance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
