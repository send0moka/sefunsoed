// Sample FAQ data inspired by by.U website structure
export const sampleFAQData = {
  title: "Frequently Asked Questions",
  subtitle: "Hai, ada yang bisa dibantu?",
  enableSearch: true,
  searchPlaceholder: "Search questions...",
  enableTopicFilter: true,
  allTopicsLabel: "All Topics",
  topics: [
    {
      name: "uStore",
      slug: "ustore",
      description: "Pertanyaan seputar toko online dan pembelian"
    },
    {
      name: "Isu SIM",
      slug: "isu-sim",
      description: "Masalah dan solusi terkait kartu SIM"
    },
    {
      name: "Jaringan",
      slug: "jaringan",
      description: "Koneksi internet dan masalah jaringan"
    },
    {
      name: "Pemakaian",
      slug: "pemakaian",
      description: "Cara penggunaan layanan dan aplikasi"
    },
    {
      name: "Aplikasi",
      slug: "aplikasi",
      description: "Bantuan terkait aplikasi mobile"
    },
    {
      name: "Buat Akun",
      slug: "buat-akun",
      description: "Panduan membuat dan mengelola akun"
    },
    {
      name: "Kuota",
      slug: "kuota",
      description: "Informasi paket data dan kuota internet"
    },
    {
      name: "Payment",
      slug: "payment",
      description: "Metode pembayaran dan transaksi"
    }
  ],
  faqItems: [
    {
      question: "Gimana sih cara cek nomor dan lihat pulsa/kuota yang udah dibeli?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Untuk cek nomor dan melihat sisa pulsa/kuota, kamu bisa:"
                }
              ]
            },
            {
              type: "list",
              listType: "number",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Buka aplikasi by.U di smartphone kamu"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Login dengan nomor by.U kamu"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Di halaman utama, kamu bisa langsung lihat sisa pulsa dan kuota"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "pemakaian",
      keywords: "cek nomor, pulsa, kuota, saldo",
      priority: 10,
      relatedQuestions: [
        {
          question: "Bagaimana cara isi ulang pulsa?",
          link: "#isi-ulang"
        },
        {
          question: "Kenapa kuota saya cepat habis?"
        }
      ]
    },
    {
      question: "Bagaimana cara aktivasi SIM Card by.U?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Aktivasi SIM Card by.U sangat mudah:"
                }
              ]
            },
            {
              type: "list",
              listType: "number",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Masukkan SIM Card ke smartphone kamu"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Download aplikasi by.U dari Play Store atau App Store"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Ikuti panduan aktivasi di aplikasi"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Verifikasi dengan KTP dan foto selfie"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "isu-sim",
      keywords: "aktivasi, sim card, registrasi",
      priority: 9,
      relatedQuestions: [
        {
          question: "Berapa lama proses aktivasi SIM Card?",
        },
        {
          question: "Dokumen apa saja yang diperlukan untuk aktivasi?"
        }
      ]
    },
    {
      question: "Kenapa saya gak bisa akses internet ya?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Ada beberapa kemungkinan kenapa internet tidak bisa diakses:"
                }
              ]
            },
            {
              type: "list",
              listType: "bullet",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Kuota sudah habis - cek sisa kuota di aplikasi"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Sinyal lemah - pindah ke area dengan sinyal lebih kuat"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "APN belum diatur - setting APN ke 'byru'"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Restart smartphone kamu"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "jaringan",
      keywords: "internet, koneksi, tidak bisa akses, troubleshoot",
      priority: 8,
      relatedQuestions: [
        {
          question: "Apa itu APN dan bagaimana cara mengaturnya?"
        },
        {
          question: "Bagaimana cara cek kualitas sinyal?"
        }
      ]
    },
    {
      question: "Kalo kuota belum habis, bisa beli tambahan kuota baru gak sih?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Tentu saja bisa! Kamu bisa beli tambahan kuota kapan saja melalui:"
                }
              ]
            },
            {
              type: "list",
              listType: "bullet",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Aplikasi by.U - pilih menu 'Beli Kuota'"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Website by.U"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Minimarket terdekat seperti Indomaret, Alfamart"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "kuota",
      keywords: "tambahan kuota, beli kuota, top up",
      priority: 7,
      relatedQuestions: [
        {
          question: "Berapa harga paket kuota by.U?"
        },
        {
          question: "Apakah kuota bisa ditransfer ke nomor lain?"
        }
      ]
    },
    {
      question: "Kok saya gak bisa login ke Aplikasi by.U ya? Kira-kira kenapa?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Masalah login bisa disebabkan oleh:"
                }
              ]
            },
            {
              type: "list",
              listType: "bullet",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Nomor belum terdaftar - pastikan SIM sudah diaktivasi"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Aplikasi perlu diupdate ke versi terbaru"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Koneksi internet bermasalah"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Cache aplikasi perlu dibersihkan"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "aplikasi",
      keywords: "login, masuk aplikasi, tidak bisa login",
      priority: 6,
      relatedQuestions: [
        {
          question: "Bagaimana cara reset password aplikasi?"
        },
        {
          question: "Dimana download aplikasi by.U yang resmi?"
        }
      ]
    },
    {
      question: "Gimana cara isi ulang Pulsa, Kuota, atau Topping by.U?",
      answer: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Isi ulang bisa dilakukan dengan berbagai cara:"
                }
              ]
            },
            {
              type: "list",
              listType: "number",
              children: [
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Melalui aplikasi by.U (paling mudah dan cepat)"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Di minimarket: Indomaret, Alfamart, dll"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Melalui mobile banking atau e-wallet"
                    }
                  ]
                },
                {
                  type: "listitem",
                  children: [
                    {
                      type: "text",
                      text: "Di counter pulsa terdekat"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      topic: "payment",
      keywords: "isi ulang, top up, bayar, pulsa",
      priority: 8,
      relatedQuestions: [
        {
          question: "Metode pembayaran apa saja yang tersedia?"
        },
        {
          question: "Apakah ada biaya admin untuk isi ulang?"
        }
      ]
    }
  ],
  layout: "cards" as const,
  showRelatedQuestions: true,
  maxItemsPerPage: 10
}
