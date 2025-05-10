import Image from "next/image";
import FooterImg from "../../assets/logo/stayverz.png";
import Link from "next/link";
import { poppins } from "@/app/font";

const footerLinks = [
    {
        title: "Company",
        links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
        title: "Support",
        links: ["Help Center", "Contact Us", "Cancellation", "Safety"],
    },
    {
        title: "Legal",
        links: ["Terms", "Privacy", "Cookies", "Sitemap"],
    },
    {
        title: "Follow Us",
        links: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
    },
];


const FooterContent = () => {
    return (

        <div className={`Container py-12 ${poppins.className}`}>
            <div className="flex flex-col md:flex-row justify-between gap-12">

                <div className="flex-shrink-0">
                    <Image
                        src={FooterImg}
                        alt="Stayverz Logo"
                        width={140}
                        height={140}
                        className="object-contain"
                    />
                    <p className="mt-4 text-sm text-gray-500 max-w-xs">
                        Homezay stay helps you explore, book, and enjoy stays around the world with confidence and ease.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-sm text-gray-600 hover:text-[#F15927] transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Okobiz.com  All rights reserved.
            </div>
        </div>

    )
}
export default FooterContent