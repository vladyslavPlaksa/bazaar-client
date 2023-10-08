import '@styles/globals.css';

export const metadata = {
    title: 'BoardGame Bazzar',
    description:
        'BoardGame Bazaar is a web application dedicated to bringing the world of board games to enthusiasts and collectors.',
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
