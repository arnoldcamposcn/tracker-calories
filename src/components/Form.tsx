import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions } from "../reducers/activityReducer";


type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })


    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const inNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: inNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
    }


    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    value={activity.name}
                    onChange={handleChange}
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. comida, Juego de Naranja, Ensalada, Ejercicio, Pesas, Bicicletas"
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    value={activity.calories}
                    onChange={handleChange}
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="calorias, ej.300 o 500 "
                />
            </div>
            <input type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white curso-pointer
                cursor-pointer disabled:opacity-10"
                // Si el user selecciona guardar comida el btn  cambia a guardar comida si no guardar ejercicio 
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    );
}
