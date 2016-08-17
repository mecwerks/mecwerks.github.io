#include <string>
#include <iostream>

std::string findPre(int num) {
  if (num < 10)
    return "00";
  else if (num < 100)
    return "0";
  else return "";
}

int main () {
  int i;
  std::string tmp;

  for (i = 0; i < 1000; i++) {
    std::cout << "<img width=444 height=570 src=\"Case Hardened/AK47/" << findPre(i) << i << " [FN].jpg\"/>" << std::endl;  
    std::cout << "<img width=444 height=570 src=\"Case Hardened/AK47/" << findPre(i) << i << " [MW].jpg\"/>" << std::endl;
    std::cout << "<img width=444 height=570 src=\"Case Hardened/AK47/" << findPre(i) << i << " [FT].jpg\"/>" << std::endl;
    std::cout << "<img width=444 height=570 src=\"Case Hardened/AK47/" << findPre(i) << i << " [WW].jpg\"/>" << std::endl;
    std::cout << "<img width=444 height=570 src=\"Case Hardened/AK47/" << findPre(i) << i << " [BS].jpg\"/>" << std::endl;
  }
}
