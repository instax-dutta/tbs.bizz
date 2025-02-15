import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Heart, Users, TrendingUp } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg relative z-10">About Us</h1>
        <p className="text-xl mb-8 text-white/80 max-w-3xl mx-auto relative z-10">
          Welcome to BizForge, a platform born out of passion and a vision to revolutionize the way businesses access
          and utilize technology. We are a team of fresh IT professionals and aspiring entrepreneurs, eager to make a
          meaningful impact in the world of business solutions.
        </p>
      </section>

      <section className="container mx-auto px-4 space-y-12">
        <Card className="bg-gradient-to-r from-yellow-100 to-pink-100">
          <CardHeader>
            <CardTitle className="text-3xl text-purple-800">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800">
              BizForge is more than just a website; it's a labor of love from a group of individuals who are deeply
              passionate about technology and its potential to transform businesses. We started our journey with a
              simple idea: to create a one-stop solution where businesses could find all the tools they need to succeed,
              without the hassle of searching across multiple platforms.
            </p>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our mission is to empower businesses with the tools and resources they need to thrive in today's fast-paced
            digital world. We believe that every business, regardless of size, deserves access to high-quality,
            reliable, and user-friendly solutions. At BizForge, we are committed to making that vision a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Innovation",
              icon: Zap,
              color: "bg-blue-500",
              description:
                "We are driven by a relentless pursuit of innovation. We are constantly exploring new technologies and ideas to bring you the latest and greatest solutions.",
            },
            {
              title: "Passion",
              icon: Heart,
              color: "bg-red-500",
              description:
                "Our passion for technology and business is at the heart of everything we do. We are excited about the potential of our platform to make a real difference in the lives of business owners and entrepreneurs.",
            },
            {
              title: "User-Centric",
              icon: Users,
              color: "bg-green-500",
              description:
                "We put our users first. We believe in creating solutions that are not only powerful but also easy to use. Our goal is to make technology accessible to everyone, regardless of their technical expertise.",
            },
            {
              title: "Growth",
              icon: TrendingUp,
              color: "bg-yellow-500",
              description:
                "We are passionate about helping businesses grow. Whether you're just starting out or looking to expand, BizForge is here to support you.",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="text-3xl">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              At BizForge, we are a team of young, ambitious IT professionals and entrepreneurs. We come from diverse
              backgrounds, but we share a common goal: to create meaningful solutions that make a difference. Our team
              is made up of individuals who are passionate about technology, business, and innovation. Together, we are
              forging a path to a brighter future.
            </p>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg">
            BizForge is more than just a platform; it's a community. We believe in the power of collaboration and the
            potential for collective innovation. We are committed to creating a space where businesses can find the
            tools they need, connect with others, and grow together.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
          <CardHeader>
            <CardTitle className="text-3xl">Join Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              We are excited to embark on this journey and invite you to join us. Whether you're a small business owner
              looking to establish your online presence or an entrepreneur with big dreams, BizForge is here to support
              you. We believe that together, we can achieve great things and make a meaningful impact in the world of
              business.
            </p>
            <p className="text-xl font-semibold">
              Thank you for choosing BizForge. We look forward to being a part of your success story.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

