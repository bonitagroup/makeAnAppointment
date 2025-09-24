export default function Footer() {
    return (
        <footer className="mt-12 border-t bg-white">
            <div className="container py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Mini Clinic — Built for demo
            </div>
        </footer>
    );
}
