import axios from 'axios';

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get('http://localhost:3000/api/get');
    
    // Mendapatkan data dari response
    const data = response.data;
    
    // Mengembalikan data sebagai props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    
    // Mengembalikan props kosong jika terjadi kesalahan
    return {
      props: {
        data: [],
      },
    };
  }
}

export default function ApiDataPage({ data }) {
  return (
    <div>
      {/* Menggunakan data yang telah diambil */}
      {data.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
    </div>
  );
}
