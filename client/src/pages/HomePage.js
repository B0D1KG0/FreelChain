import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { wallet, connected } = useWallet();
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        if (connected && wallet) {
            setUserAddress(wallet.publicKey.toString());
        } else {
            setUserAddress('');
        }
    }, [wallet, connected]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Шапка */}
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            FreelChain
          </span>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#how-it-works" className="hover:text-purple-400 transition-colors">
                        Як це працює
                    </a>
                    <a href="#benefits" className="hover:text-purple-400 transition-colors">
                        Переваги
                    </a>
                    {connected ? (
                        <Link to="/dashboard" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                            Особистий кабінет
                        </Link>
                    ) : (
                        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
                    )}
                </nav>

                <div className="md:hidden">
                    <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
                </div>
            </header>

            {/* Головна секція */}
            <main>
                {/* Hero секція */}
                <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Знайдіть роботу або фрілансера у блокчейн-мережі
                        </h1>
                        <p className="text-xl mb-8 text-gray-300">
                            FreelChain - інноваційна платформа для фрілансерів з надійними транзакціями
                            на блокчейні Solana. Безпечні платежі, захист від шахрайства та низькі комісії.
                        </p>

                        {!connected ? (
                            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !px-8 !py-3 !text-lg" />
                        ) : (
                            <div className="space-y-2">
                                <p className="text-green-400">✓ Гаманець підключено</p>
                                <p className="text-sm text-gray-400 break-all">Адреса: {userAddress}</p>
                                <Link to="/dashboard" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-lg">
                                    Перейти до проектів
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2">
                        <img src="/hero-image.svg" alt="FreelChain" className="max-w-full" />
                    </div>
                </section>

                {/* Як це працює */}
                <section id="how-it-works" className="bg-gray-800 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Як це працює</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-700 rounded-xl p-6 text-center">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Підключіть гаманець</h3>
                                <p className="text-gray-300">
                                    Зареєструйтесь на платформі, підключивши свій гаманець Solana (Phantom, Solflare та інші).
                                </p>
                            </div>

                            <div className="bg-gray-700 rounded-xl p-6 text-center">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Створіть або знайдіть проект</h3>
                                <p className="text-gray-300">
                                    Розмістіть ваше замовлення або знайдіть цікавий проект для роботи.
                                </p>
                            </div>

                            <div className="bg-gray-700 rounded-xl p-6 text-center">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Отримайте оплату</h3>
                                <p className="text-gray-300">
                                    Всі транзакції захищені смарт-контрактами. Оплата гарантована після виконання роботи.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Переваги */}
                <section id="benefits" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Переваги FreelChain</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex">
                                <div className="mr-4 text-purple-400 text-4xl">✓</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Безпечні платежі</h3>
                                    <p className="text-gray-300">
                                        Використання смарт-контрактів гарантує безпеку транзакцій
                                        і автоматичне дотримання умов угоди.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mr-4 text-purple-400 text-4xl">✓</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Низькі комісії</h3>
                                    <p className="text-gray-300">
                                        Завдяки блокчейну Solana, комісії за транзакції мінімальні порівняно з традиційними
                                        платіжними системами.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mr-4 text-purple-400 text-4xl">✓</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Децентралізація</h3>
                                    <p className="text-gray-300">
                                        Платформа працює без посередників, що збільшує прозорість і знижує вартість послуг.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mr-4 text-purple-400 text-4xl">✓</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Прозорість</h3>
                                    <p className="text-gray-300">
                                        Вся історія транзакцій та взаємодій зберігається в блокчейні та доступна для перевірки.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Футер */}
            <footer className="bg-gray-900 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                FreelChain
              </span>
                        </div>

                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Про нас
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Політика конфіденційності
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Умови використання
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-gray-500">
                        © {new Date().getFullYear()} FreelChain. Всі права захищені.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;