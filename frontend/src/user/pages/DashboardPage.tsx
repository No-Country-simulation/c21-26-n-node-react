import { useAuth } from '../../shared/context/AuthContext';
import { panels } from '../data/panel.data'
import { PanelRole } from '../../shared/models/panel';
import { DashboardCard } from '../components/dashboard/DashboardCard';

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <main className='w-full h-full flex flex-row flex-wrap gap-5 justify-evenly'>
        <section className={`mb-6 ${user?.role=='teacher'?'':'hidden'}`}>
        <h2 className="text-2xl font-semibold mb-5 font-Roboto text-center">Mi panel personalizado</h2>
          <div className="w-full flex flex-row gap-5 flex-wrap justify-evenly items-center">
            {
              panels.filter((panel)=>panel.role===PanelRole.TEACHER).map((item)=>{
                return <DashboardCard panel={item} key={item.title} id={user!._id}/>
              })
            }
          </div>
        </section>

        <section id="alumnos" className={`mb-6 ${user?.role=='teacher'?'':'hidden'}`}>
          <h2 className="text-2xl font-semibold mb-5 font-Roboto text-center">Mi panel personalizado</h2>
          <div className="w-full flex flex-row gap-5 flex-wrap justify-evenly">
          {
              panels.filter((panel)=>panel.role===PanelRole.STUDENT).map((item)=>{
                return <DashboardCard panel={item} key={item.title} id={user!._id}/>
              })
            }
          </div>
        </section>

        <section id="padres" className={`mb-6 ${user?.role=='teacher'?'':'hidden'}`}>
          <h2 className="text-2xl font-semibold mb-5 font-Roboto text-center">Mi panel personalizado</h2>
          <div className="w-full flex flex-row gap-5 flex-wrap justify-evenly">
            {
              panels.filter((panel)=>panel.role===PanelRole.PARENT).map((item)=>{
                return <DashboardCard panel={item} key={item.title} id={user!._id}/>
              })
            }
          </div>
        </section>

      </main>
    </div>
  );
};

export default DashboardPage;
