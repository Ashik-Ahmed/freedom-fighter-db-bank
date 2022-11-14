import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SiAddthis } from 'react-icons/si';
import FreedomFighterRow from '../../components/FreedomFighterRow/FreedomFighterRow';
import { getFreedomFighter } from '../../controllers/freedomFighter.controller';

const Home = ({ freedomFighters }) => {


    const router = useRouter();

    //refresh the component
    const refreshData = () => {
        router.replace(router.asPath);
    }


    return (
        <div>
            <div className="overflow-x-auto m-8">
                <div className='max-w-7xl mx-auto'>
                    <div className='bg-primary p-2 rounded-md inline-block mb-2'>
                        <Link href='/freedom-fighters/add-new' className='flex items-center gap-x-2'><SiAddthis /> Add Freedom Fighter</Link>
                    </div>
                    <table className="table-auto container w-full mx-auto shadow-md mb-8">
                        <thead className='bg-primary '>
                            <tr className='w-full text-left rounded-t-md'>
                                <th className='p-2 rounded-tl-md'>Name</th>
                                <th>Contact</th>
                                <th>Rank</th>
                                <th>Upadhi</th>
                                <th>Attended</th>
                                <th className='rounded-tr-md'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border bg-white'>
                            {
                                freedomFighters && freedomFighters?.map(fighter =>
                                    <FreedomFighterRow key={fighter._id} freedomFighter={fighter} refreshData={refreshData}></FreedomFighterRow>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;


export const getStaticProps = async (context) => {
    const data = await getFreedomFighter();
    // console.log(users)
    const result = JSON.parse(JSON.stringify(data))

    return {
        props: {
            freedomFighters: result,
            // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
        }
    }
}