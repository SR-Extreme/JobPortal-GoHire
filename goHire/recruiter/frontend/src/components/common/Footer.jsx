const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">GoHire Recruiter</h3>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} GoHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

