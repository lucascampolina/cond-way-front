import { Link } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const SidebarNavigation = ({ navigation, isSubmenuExpanded, toggleSubmenu }) => (
    <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
                <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <div className="flex items-center justify-between">
                                <Link
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                                {item.submenu && (
                                    <button
                                        onClick={toggleSubmenu}
                                        className="text-gray-500 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded-md"
                                    >
                                        {isSubmenuExpanded ? (
                                            <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </button>
                                )}
                            </div>
                            {item.submenu && isSubmenuExpanded && (
                                <ul className="ml-6 mt-2 space-y-1">
                                    {item.submenu.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                to={subItem.href}
                                                className="text-gray-500 hover:text-indigo-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-sm font-medium pl-9"
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </li>
            {/* Outros itens da navegação */}
        </ul>
    </nav>
);

export default SidebarNavigation;
