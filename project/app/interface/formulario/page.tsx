export default function FormularioPage() {
    return (
        <div>
            <h1>Formulario Page</h1>
            <form action="">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}