import { redirect } from "next/navigation";

export default function MainPage() {
  redirect("/main/home");
  return null;
}
            </div>
          </div>

          {/* Additional content sections */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Course Activity {i}</p>
                    <p className="text-xs text-gray-500">Completed 2 hours ago</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">+10 XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default XolveTechLayout;