import PN01Paper from '@/app/components/paper/pn01-paper';
import data from '@/app/model/formData.json'

export default function page() {
  return (
    <div>
      <PN01Paper dataPaper={data}/>
    </div>
  );
}
