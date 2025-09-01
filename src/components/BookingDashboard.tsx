import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar,
  Clock,
  MapPin,
  Eye,
  Navigation,
  Star,
  Phone,
  MessageCircle,
  MoreVertical,
  CheckCircle,
  Timer,
  Truck
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LiveTracking } from './LiveTracking';

interface Booking {
  id: string;
  serviceName: string;
  serviceImage: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  pet: {
    name: string;
    image: string;
    type: string;
  };
  caregiver: {
    name: string;
    image: string;
    rating: number;
    phone: string;
  };
  price: number;
  address: string;
  duration: string;
  notes?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceName: 'Professional Grooming',
    serviceImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop&crop=center',
    date: 'Today',
    time: '2:00 PM - 3:30 PM',
    status: 'in-progress',
    pet: {
      name: 'Max',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=faces',
      type: 'Golden Retriever'
    },
    caregiver: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b601?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
      phone: '+1 (555) 123-4567'
    },
    price: 75,
    address: '123 Main St, City, State',
    duration: '1.5 hours'
  },
  {
    id: '2',
    serviceName: 'Dog Walking',
    serviceImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop&crop=center',
    date: 'Tomorrow',
    time: '10:00 AM - 11:00 AM',
    status: 'upcoming',
    pet: {
      name: 'Max',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=faces',
      type: 'Golden Retriever'
    },
    caregiver: {
      name: 'Mike Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      phone: '+1 (555) 987-6543'
    },
    price: 25,
    address: '123 Main St, City, State',
    duration: '1 hour'
  },
  {
    id: '3',
    serviceName: 'Pet Training',
    serviceImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop&crop=center',
    date: 'Dec 20, 2024',
    time: '3:00 PM - 4:30 PM',
    status: 'completed',
    pet: {
      name: 'Luna',
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=100&h=100&fit=crop&crop=faces',
      type: 'Persian Cat'
    },
    caregiver: {
      name: 'Emily Davis',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5.0,
      phone: '+1 (555) 456-7890'
    },
    price: 65,
    address: '123 Main St, City, State',
    duration: '1.5 hours'
  }
];

interface BookingDashboardProps {
  onShowLiveTracking?: () => void;
}

export function BookingDashboard({ onShowLiveTracking }: BookingDashboardProps) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showLiveTracking, setShowLiveTracking] = useState(false);

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming' || b.status === 'in-progress');
  const pastBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-[#FFD66B] text-[#333333]';
      case 'in-progress': return 'bg-[#6EC18E] text-white';
      case 'completed': return 'bg-[#333333] text-white';
      case 'cancelled': return 'bg-[#E74C3C] text-white';
      default: return 'bg-[#E0E0E0] text-[#666666]';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming': return <Timer className="w-4 h-4" />;
      case 'in-progress': return <Navigation className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <div className="w-4 h-4 rounded-full bg-current" />;
      default: return null;
    }
  };

  const handleLiveTrack = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowLiveTracking(true);
  };

  if (showLiveTracking) {
    return <LiveTracking onClose={() => setShowLiveTracking(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#333333] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            My Bookings
          </h1>
          <p className="text-xl text-[#666666]" style={{ fontFamily: 'var(--font-body)' }}>
            Manage your pet care appointments and track services in real-time
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="upcoming" className="relative">
                Upcoming
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#6EC18E] rounded-full"
                  initial={{ width: activeTab === 'upcoming' ? '100%' : 0 }}
                  animate={{ width: activeTab === 'upcoming' ? '100%' : 0 }}
                  transition={{ duration: 0.15 }}
                />
              </TabsTrigger>
              <TabsTrigger value="past" className="relative">
                Past
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#6EC18E] rounded-full"
                  initial={{ width: activeTab === 'past' ? '100%' : 0 }}
                  animate={{ width: activeTab === 'past' ? '100%' : 0 }}
                  transition={{ duration: 0.15 }}
                />
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="space-y-6">
              <AnimatePresence>
                {upcomingBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Service Image */}
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={booking.serviceImage}
                              alt={booking.serviceName}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-[#333333] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                  {booking.serviceName}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-[#666666]">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {booking.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {booking.time}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    At your home
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                                </Badge>
                                <span className="text-xl font-bold text-[#6EC18E]">${booking.price}</span>
                              </div>
                            </div>

                            {/* Pet & Caregiver Info */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {/* Pet */}
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={booking.pet.image} />
                                    <AvatarFallback>{booking.pet.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium text-[#333333]">{booking.pet.name}</p>
                                    <p className="text-xs text-[#666666]">{booking.pet.type}</p>
                                  </div>
                                </div>

                                {/* Caregiver */}
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={booking.caregiver.image} />
                                    <AvatarFallback>{booking.caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium text-[#333333]">{booking.caregiver.name}</p>
                                    <div className="flex items-center text-xs text-[#666666]">
                                      <Star className="w-3 h-3 fill-[#FFD66B] text-[#FFD66B] mr-1" />
                                      {booking.caregiver.rating}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Details
                                  </Button>
                                </motion.div>
                                
                                {booking.status === 'in-progress' && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      onClick={() => handleLiveTrack(booking.id)}
                                      className="bg-[#6EC18E] hover:bg-[#5BB07F] text-white"
                                      size="sm"
                                    >
                                      <Navigation className="w-4 h-4 mr-2" />
                                      Live Track
                                    </Button>
                                  </motion.div>
                                )}

                                {booking.status === 'upcoming' && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-[#6EC18E] border-[#6EC18E] hover:bg-[#6EC18E] hover:text-white"
                                    >
                                      <Phone className="w-4 h-4 mr-2" />
                                      Contact
                                    </Button>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {upcomingBookings.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-12 h-12 text-[#666666]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">No upcoming bookings</h3>
                  <p className="text-[#666666] mb-6">Book a service to get started with premium pet care.</p>
                  <Button className="bg-[#6EC18E] hover:bg-[#5BB07F] text-white">
                    Book Service
                  </Button>
                </motion.div>
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="space-y-6">
              <AnimatePresence>
                {pastBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 opacity-90">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Service Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={booking.serviceImage}
                              alt={booking.serviceName}
                              className="w-full h-full object-cover grayscale"
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-[#333333] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                  {booking.serviceName}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-[#666666]">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {booking.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {booking.time}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                                <span className="text-lg font-bold text-[#666666]">${booking.price}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={booking.pet.image} />
                                    <AvatarFallback className="text-xs">{booking.pet.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-[#666666]">{booking.pet.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={booking.caregiver.image} />
                                    <AvatarFallback className="text-xs">{booking.caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-[#666666]">{booking.caregiver.name}</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-[#666666] hover:text-[#333333]">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                {booking.status === 'completed' && (
                                  <Button variant="ghost" size="sm" className="text-[#6EC18E] hover:text-[#5BB07F]">
                                    <Star className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}