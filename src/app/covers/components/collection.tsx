/**
 * Asynchronous React component that fetches a list of covers from the Supabase database
 * and renders its children as a function, passing the fetched covers as an argument.
 *
 * @param {Object} props - The component props.
 * @param {(covers: any[]) => React.ReactNode} props.children - A render prop function that receives the array of covers and returns React nodes.
 * @returns {Promise<JSX.Element>} The rendered children with the covers data, or an error message if fetching fails.
 *
 * @example
 * <Collection>
 *   {(covers) => (
 *     <ul>
 *       {covers.map((cover) => (
 *         <li key={cover.id}>{cover.title}</li>
 *       ))}
 *     </ul>
 *   )}
 * </Collection>
 */
import { supabase } from '../../../lib/supabase'

type CollectionProps = {
    children: (covers: any[]) => React.ReactNode;
};

export default async function Collection({ children }: CollectionProps) {
    const { data: covers, error } = await supabase
        .from('covers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar covers:', error);
        return <div>Erro ao carregar covers: {error.message}</div>;
    }

    return (
        <>{children(covers || [])}</>
    );
}